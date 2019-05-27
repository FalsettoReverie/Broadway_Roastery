"use strict";
/*
     File:     event.js
     Author:   Ying Ye (cst217)
     Date:     5/24/2019
     Purpose: 
*/
let sampleEvents=[];
const dataContainer = document.getElementById('results_display');

$(document).ready(function () {
    $("#event").bootstrapValidator({
        excluded: ':disabled',
        fields: {
                Name: {
                    notEmpty: {
                      message:  'The username is required and cannot be empty'
                    },
                    validators: {
                        callback: {
                            message: "Name cannot be all spaces",
                            callback: function (value, validator) {
                                let nameString=value.trim();
                                return nameString.length>=2;
                            }
                        },
                    }
                },
                date: {
                    notEmpty: {
                        message: 'The date for event is required and cannot be empty'
                    }
                },
                Email: {
                    notEmpty: {
                        message: 'The Email is required and cannot be empty'
                    }
                },
                title: {
                    notEmpty: {
                        message: 'The Topic of event is required and cannot be empty'
                    }
                }
            }
        }
    );


    const handleFormSubmit= event=> {

        if($("#event").bootstrapValidator().has('.has-error').length===0) {
            $('wrapper').empty();
            const data = formToJSON(form.elements);
            let dayString= data.date.split("-");
             data.date=new Date(dayString[0],parseInt(dayString[1])-1,dayString[2]);
            sampleEvents.push(data);
            let cal=$("#calendar");
            cal.MEC({
                events: sampleEvents
            });

        }
        return false;
    };

    $("#calendar").MEC({
        events: sampleEvents
    });

    const form= document.getElementById('event');

    form.addEventListener('submit', handleFormSubmit);

    const formToJSON = elements =>[].reduce.call(elements,(data,element)=>{
        if(isValidElement(element)&&isValidValue(element)){
            data[element.name]=element.value;
        }
        return data;
    },{});

    const isValidElement = element => {
        return element.name && element.value;
    };

    const  isValidValue = element => {
        return (!['checkbox','radio'].includes(element.type)||element.checked);
    };

});
