var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET questions listing. */
router.get('/', function(req, res) {
  models.Question.findAll({ where: { admin_id: req.user.id } }).then(function(questions){
    res.render('questions/index', {questions: questions});
  });
});

/* GET new question form */
router.get('/new', function(req, res){
  res.render('questions/new', {});
});

/* POST create question */
router.post('/', function(req, res){
  return models.sequelize.transaction(function(t) {
    return models.Question.create({
      admin_id: req.user.id,
      value: req.body.question.value
    }, {transaction: t}).then(function(question){
      req.body.question.choices.forEach(function(choice){
        if(choice.value === ''){ return; } // skip if the choice is blank
        var c = models.Choice.create({question_id: question.id, value: choice.value}, {transaction: t});
        question.addChoice(c);
      });
      return question;
    });
  }).then(function(question){
    res.redirect('/questions/' + question.id);
  }).catch(function(err){
    req.flash('error', err);
    res.render('questions/new', {});
  });
});

router.route('/:id')
  .all(function(req, res, next){
    models.Question.find({ attributes: ['id', 'value'],
                           where: {id: req.params.id, admin_id: req.user.id},
                           include: {model: models.Choice,
                                     attributes: ['id', 'value', [models.sequelize.fn('coalesce', models.sequelize.fn('sum', models.sequelize.col('choices.Answers.id')), 0), 'selected']],
                                     include: [{model: models.Answer, attributes: []}] },
                           group: ['Question.id', 'choices.id']}).then(function(question){
      if(!question){
        var e = new Error('Question not found');
        e.status = 404;
        return next(e);
      }
      req.params.question = question;
      next();
    });
  })
  /* GET question details */
  .get(function(req, res, next){
    var choices = req.params.question.choices;
    var total = choices.reduce(function(p, choice){ return p + choice.selected; }, 0);
    choices.forEach(function(choice){ choice.set('total', total); });
    res.render('questions/show', {question: req.params.question});
  })
  /* DELETE question */
  .delete(function(req, res){
    req.params.question.destroy().then(function(){
      res.redirect('/questions');
    });
  });

module.exports = router;
