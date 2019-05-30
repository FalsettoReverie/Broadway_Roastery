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
    //form validator
    $("#event").bootstrapValidator({
        excluded: ':disabled',
        fields: {
                //name field is required and trimmed string length must be greater than 2
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
                //date field is required
                date: {
                    notEmpty: {
                        message: 'The date for event is required and cannot be empty'
                    }
                },
                //email field is required
                Email: {
                    notEmpty: {
                        message: 'The Email is required and cannot be empty'
                    }
                },
                //title field is required.
                title: {
                    notEmpty: {
                        message: 'The Topic of event is required and cannot be empty'
                    }
                }
            }
        }
    );

    //submit event handler method
    const handleFormSubmit= event=> {
        //if the form is validated
        if($("#event").bootstrapValidator().has('.has-error').length===0) {
            //remove all the elements in calendar area
            $('wrapper').empty();
            //make the form value to an event json object
            const data = formToJSON(form.elements);
            //get the date field value and make it to comply a date format.
            let dayString= data.date.split("-");
             data.date=new Date(dayString[0],parseInt(dayString[1])-1,dayString[2]);
            //push the event object into sampleEvents array
            sampleEvents.push(data);
            let cal=$("#calendar");
            //make an new calendar
            cal.MEC({
                events: sampleEvents
            });

        }
        //prevent submit
        return false;
    };
    //load an empty event calendar
    $("#calendar").MEC({
        events: sampleEvents
    });

    const form= document.getElementById('event');
    //add event listener to submit button
    form.addEventListener('submit', handleFormSubmit);

    //make the event object to a json array
    const formToJSON = elements =>[].reduce.call(elements,(data,element)=>{
        if(isValidElement(element)&&isValidValue(element)){
            data[element.name]=element.value;
        }
        return data;
    },{});
    //when element has value return ture
    const isValidElement = element => {
        return element.name && element.value;
    };
    //get the value of checkbox and radio field.
    const  isValidValue = element => {
        return (!['checkbox','radio'].includes(element.type)||element.checked);
    };

});
