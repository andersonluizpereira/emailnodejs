import * as express from "express";
import * as httpStatus from 'http-status';
import * as bodyParser from "body-parser";
import Mail from "./services/mail";

 const sgMail = require('@sendgrid/mail');
 sgMail.setApiKey(process.env.SENDGRID_API_KEY);


class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.routes();
    }
    routes() {

        this.app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' })
        });

        this.app.route("/").post((req, res) => {
             const message = Object.assign({}, req.body);     
            
            // Mail.to = message.to;
            // Mail.subject = message.subject;
            // Mail.message = message.message;
            // let result = Mail.sendMail();

            const msg = {
                to: message.to,
                from: 'andy2903.alp@gmail.com',
                subject: message.subject,
                text: message.subject,
                html: message.message,
              };

          // sgMail.send(msg);


          module.exports.send = function send(html,subject,to,from){

            return new Promise((resolve,reject)=>{
        
                sgMail.send({
                    to,
                    from,
                    subject,
                    html
                }).then(resolve).catch(reject);
                        
            });
        };

           //res.status(200).json({ 'result': result })

        //    return sgMail.send(msg, function(err, reply) {
        //     console.log(reply)
        //        res.format({
        //            json : () => {
        //              res.json(reply)
        //            }
        //          })
   
        //      });

        });


    }
}

export default new App();