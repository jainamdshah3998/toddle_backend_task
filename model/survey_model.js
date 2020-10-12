var db=require('../db_connection');
var survey={
    generate_survey:function(item,callback){
        return db.query('insert into create_survey(name) values (?)',[item.username],callback);
    },
    question_add:function(item,callback){
        return db.query('insert into survey_questions(id,question,choice1,choice2) values (?,?,?,?)',[item.id,item.question,item.choice1,item.choice2],callback);
    },
    take_survey:function(id,callback){
        return db.query('select question,choice1,choice2 from survey_questions where id=?',[id],callback);
    },
    submit_survey:function(item,callback){
        return db.query('insert into survey_answers(id,question,choice1,choice2,name,answer) values(?,?,?,?,?,?)',[item.id,item.question,item.choice1,item.choice2,item.name,item.answer],callback);
    },
    survey_result:function(id,callback){
        return db.query('select question,choice1,choice2,name,answer from survey_answers where id=? ',[id],callback);
    }
};
module.exports=survey;