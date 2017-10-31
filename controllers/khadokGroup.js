var KhadokGroup = require('../models/KhadokGroup');
var User = require('../models/User');

exports.addKhadokGrp = function(req, res){
    var val = req.body.khadokGrp;

    KhadokGroup.find({name: val.name}, function(err, oldGrp){
        if(err){
            console.log(err);
        }else if(!oldGrp){
            var khadokGrp = new KhadokGroup({
                name: val.name,
                pin: val.pin,
                timeSettings: val.timeSettings,
                membersId: val.membersId,
            }).save(function(err, khadokGrp){
                if(err){
                    console.log(err);
                }else{
                    User.findByIdAndUpdate(val.membersId, {
                        $set: {
                            permission: 'Manager',
                            khadokGroupId: khadokGrp._id, 
                        }
                    }, function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.send(khadokGrp);
                        }
                        
                    });
                    
                }
            })
        }else{
            return res.status(401).send({ msg: 'This khadokGrp already Added' });
        }
    })

}



exports.addNewMemberId  = function(req, res){
    var val = req.body.khadokGrp;
    
    KhadokGroup.findById(val.id, function(err, oldGrp){
        if(err){
            console.log(err);
        }else if(!oldGrp){

            return res.status(401).send({ msg: 'This ' + val.name + ' is not associated with any account. ' +
            'Double-check your Group and try again.'
            });

        } else if(oldGrp.pin == val.pin && oldGrp.name == val.name){
            KhadokGroup.update(
                { _id: val.id },
                { $push: { membersId: val.membersId } }, function(err, khadokGrp){
                    if(err){
                        console.log(err);
                    }else{

                        User.findByIdAndUpdate(val.membersId, {
                            $set: {
                                permission: 'Member',
                                khadokGroupId: khadokGrp._id, 
                            }
                        }, function(err){
                            if(err){
                                console.log(err);
                            }else{
                                res.send(khadokGrp);
                            }
                            
                        });
                        
                    }
                })
        }else{
            return res.status(401).send({ msg: 'This Pin is not matched with this' + val.name + ' '
            });
        }
    })
}







exports.updateSetting  = function(req, res){
    var val = req.body.khadokGrp;
    
    KhadokGroup.findById(val.id, function(err, oldGrp){
        if(err){
            console.log(err);
        }else if(!oldGrp){

            return res.status(401).send({ msg: 'This ' + val.name + ' is not associated with any account. ' +
            'Double-check your Group and try again.'
            });

        } else if(oldGrp.pin == val.pin && oldGrp.name == val.name){
            KhadokGroup.update(
                { _id: val.id },
                { $push: { membersId: val.membersId } }, function(err, khadokGrp){
                    if(err){
                        console.log(err);
                    }else{
                        res.send(khadokGrp);
                    }
                })
        }else{
            return res.status(401).send({ msg: 'This Pin is not matched with this' + val.name + ' '
            });
        }
    })
}