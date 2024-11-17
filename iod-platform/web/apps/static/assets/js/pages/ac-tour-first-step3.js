'use strict';
document.addEventListener("DOMContentLoaded", function () {
    
    // Check if the tour has been completed
    console.log("user requires tour : " + user_tour_status);
    if(user_tour_status.toString() == "Not-Started") {
        for (let i = 1; i < 9; i++) {
            let step_name = "tour_step" + i.toString() + "_completed";
            //console.log(step_name);
            localStorage.setItem(step_name, 'no');
        }
    };
    if(user_tour_status.toString() == "Completed") {
        localStorage.clear();
    };
    if(user_tour_status.toString() == "In-Progress") {

        let jsonArrayString = '[{"name": "step1", "status": "completed"}, {"name": "step2", "status": "not started"}]';
        //console.log(jsonArrayString);
        //console.log(user_tour_steps_json);
        
        let user_tour_steps_list = JSON.parse(user_tour_steps_json);
        
        //console.log(user_tour_steps_list);

        //console.log("inside set up of : " + user_tour_status);
        //console.log(userTourSteps);
        for(let i = 0; i < user_tour_steps_list.length; i++) {
            console.log(user_tour_steps_list[i].fields.status); 
            let step_status = user_tour_steps_list[i].fields.status;
            let step_name = user_tour_steps_list[i].fields.step_name;
            let step_desc = 'tour_step'+step_name+'_completed';
            if(step_status == "Completed")
            {
                localStorage.setItem(step_desc, 'yes');
            }
            else
            {
                localStorage.setItem(step_desc, 'no');
            }  
        };
        
    };
    if(user_tour_status.toString()=="Not-Started"||user_tour_status.toString()=="In-Progress")
    {
        if (localStorage.getItem('tour_step1_completed') !== 'yes') {
            var intro = introJs();
            intro.setOptions({
                steps: [{
                    element: document.querySelector('.sidebar-settings-step1'),
                    intro: "Welcome to InvestODiary.com. I will help you get started. Please click on Settings - option on the sidebar ",
                }]
            })
            .onexit(function() {
                // Code to disable the tour when it's exited
                //localStorage.setItem('tour_step1_completed', 'yes');
            })
            .oncomplete(function() {
                // Code to disable the tour when it's completed
                let status = 'completed';  // The new step status
                fetch('/update_step_status/', {
                    method: 'POST',
                    body: JSON.stringify({
                        'name' : '1',
                        'status': 'Completed'
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken  // You need to include CSRF token in your requests
                    }
                })
                .then(response => response.json())    
                .then(data => {
                    if(data.status.toString() === "success") {
                        localStorage.setItem('tour_step1_completed', 'yes');
                    }
                    //console.log(data.status);
                });
    
            })
            .start();
        }
        else if (localStorage.getItem('tour_step2_completed') == 'yes' && localStorage.getItem('tour_step3_completed') !== 'yes') {
            var intro = introJs();
            intro.setOptions({
                steps: [{
                    element: document.querySelector('.networth-summary-step1'),
                    intro: "Great, Now you can plan and track your investments",
                },
                {
                    element: document.querySelector('.networth-summary-step2'),
                    intro: "Right now you do not have any categories set up, lets fix that ",
                },
                {
                    element: document.querySelector('.edit-networth-step3'),
                    intro: "Click on Edit Networth ",
                }
            ]
            })
            .onexit(function() {
                // Code to disable the tour when it's exited
                localStorage.setItem('tour_step3_completed', 'yes');
            })
            .oncomplete(function() {
                // Code to disable the tour when it's completed
                
                let status = 'completed';  // The new step status
                fetch('/update_step_status/', {
                    method: 'POST',
                    body: JSON.stringify({
                        'name' : '3',
                        'status': 'Completed'
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken  // You need to include CSRF token in your requests
                    }
                })
                .then(response => response.json())    
                .then(data => {
                    if(data.status.toString() === "success") {
                        localStorage.setItem('tour_step3_completed', 'yes');
                    }
                    //console.log(data.status);
                });
    
            })
            .start();
        }
    }
});
