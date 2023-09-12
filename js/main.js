import { db } from '/js/firebase.js'

import {collection, doc, setDoc, addDoc, deleteDoc, getDoc, getDocs} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"; 

var student_number, coursesTaken, totalAverage;
$(function(){
    console.log("MAIN JAVASCRIPT IS RUNNING..");

    courseManager();

    $('#signup-btn').click(function(){
        var fname = $('#fname-signup').val();
        var lname = $('#lname-signup').val();
        var sn = $('#snum-signup').val();
        var pw = $('#psw-signup').val();

        console.log(fname, lname, sn, pw);

        createAccount(fname, lname, sn, pw);
    });

    $('#login-btn').click(function(){
        var sn = $('#sn-login').val();
        var pw = $('#psw-login').val();
        console.log(sn,pw);

        login(sn, pw);
    });

    $('#logout-btn').click(function(){
        localStorage.removeItem("uid");
        window.location.replace("index.html");
    });

    window.current_user = localStorage.getItem("uid");
    var currentPage = window.location.pathname;

    if(currentPage == '/home.html'){
        if(window.current_user!=null){
            userLoggedIn(localStorage.getItem("uid"));
        }
        else{
            window.alert("No user is logged in!");
            window.location.replace("index.html");
        }
    }
})
/**
 * Account Manager
 */
function createAccount(fname, lname, sn, password){
    var docData = {
        sn: sn,
        pw: password,
        fname: fname,
        lname: lname
    }

    const query = getDocs(collection(db, "users"));
    
    if(query.empty){
        console.log ('Empty Query');
    }
    else{
        console.log("Query is not empty");
        query.then(function(query) {
            query.forEach(doc => {
                var snum = doc.data().sn;
                
                if(snum != sn){
                    console.log("Continue");
                }
                else{
                    window.alert("Duplicate Found! Please log into your EXISTING account!");
                    $('#signupform').hide();
                    $('#loginform').show();
                    throw sn;
                }
            })
        }).then(function(){
            setDoc(doc(db, "users", sn), docData)
            .then(function(){
              window.alert("Account Created!");
              $('#signupform').hide();
          });
        })
    }
}

function login(sn, password){
    const query = getDocs(collection(db, "users"));
    console.log(query);
    if(query.empty){
        console.log ('Empty Query');
    }
    else{
        console.log("Query is not empty");
        query.then(function(query) {
            query.forEach(doc => {
                var snum = doc.data().sn;
                var psw = doc.data().pw;
                
                if(snum == sn && password == psw){
                    console.log("Found");
                    $('#sn-login').css('border-color', 'green');
                    $('#psw-login').css('border-color', 'green');
                    localStorage.setItem("uid", sn);
                    window.alert("Matching records found!");
                    window.location.replace("home.html");
                }
                else{
                    console.log("Not Found");
                    $('#sn-login').css('border-color', 'red');
                    $('#psw-login').css('border-color', 'red');
                }
            })
        });
    }

}

function userLoggedIn(sn){
    console.log(sn);

    getDoc(doc(db, "users", sn)).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          var fullname = docSnap.data().fname +' '+docSnap.data().lname;
          student_number = docSnap.data().sn;

          $('#fullName').text(fullname);
          $('#studentNum').text(student_number);

          updateCourseTable(student_number);

        } else {
          console.log("No such document!");
        }
    })
}

/**
 * COURSE MANAGER
 */
function courseManager(){
    $('#courseAdder').hide();
    $('#courseRemover').hide();
    $('#goalCalculator').hide();

    $('#loginbtn').click(function(){
        console.log('login is clicked');
        $('#loginform').show();
    });

    $('#signupbtn').click(function(){
        console.log('signup is clicked');
        $('#signupform').show();
    });
    $('#calculate').click(function(){
        updateCourseTable(localStorage.getItem('uid'));
        if($('#goalCalculator').is(":visible")){
            $('#courseRemover').hide();
            $('#courseAdder').hide();
            $('#goalCalculator').hide();
        }
        else{
            $('#courseRemover').hide();
            $('#courseAdder').hide();
            $('#goalCalculator').show();
        }
    });
    $('#goalCalc-btn').click(function(){
        var goalInput = $('#goalInput').val();
        var coursesToTake = $('#numOfcourses').val();

        var totalCourses = parseInt(coursesTaken) + parseInt(coursesToTake);
        goalInput *= totalCourses;
        goalInput -= totalAverage;
        goalInput /=coursesToTake;

        if(goalInput > 100 || goalInput < 0)
        var output = "Goal average is impossible";
        else
        var output = "Goal Average for the upcoming semester: "+goalInput+"%";
        $('#output').text(output);
    })

    $('#login').click(function(){
        window.open('home.html');
    });

    $('#logoutbtn').click(function(){
        window.open('index.html');
    });``
    
    //TO ADD COURSES
    $('#add').click(function(){
        if($('#courseAdder').is(":visible")){
            $('#courseAdder').hide();
            $('#goalCalculator').hide();
        }
        else{
            $('#courseAdder').show();
            $('#courseRemover').hide();
            $('#goalCalculator').hide();
        }
    });

    $('#addCourseBtn').click(function(){
        var code = $('#courseCode1').val();
        var ave = $('#courseAve').val();
        var letter = convertToLetterGrade(ave);

        console.log(letter);

        var docData = {
            code: code,
            average: ave,
            lettergrade: letter
        }
        setDoc(doc(db, "users/"+student_number+'/coursesTaken', code), docData);
        updateCourseTable(localStorage.getItem('uid'));
    });

    //TO REMOVE COURSES
    $('#remove').click(function(){
        if($('#courseRemover').is(":visible")){
            $('#courseRemover').hide();
            $('#goalCalculator').hide();
        }
        else{
            $('#courseRemover').show();
            $('#courseAdder').hide();
            $('#goalCalculator').hide();
        }
    });

    $('#removeCourseBtn').click(function(){
        var input = $('#courseCode2').val();
        removeCourse(input);
        updateCourseTable(localStorage.getItem('uid'));
    });
}

function convertToLetterGrade(average){
    var letterGrade;
    if(50 <= average && average < 55){
        letterGrade = 'D';
    } else if(55 <= average && average < 60){
        letterGrade = 'C-';
    } else if(60 <= average && average < 65){
        letterGrade = 'C';
    } else if(65 <= average && average < 70){
        letterGrade = 'C+';
    } else if(70 <= average && average < 75){
        letterGrade = 'B-';
    } else if(75 <= average && average < 80){
        letterGrade = 'B';
    } else if(80 <= average && average < 85){
        letterGrade = 'B+';
    } else if(85 <= average && average < 90){
        letterGrade = 'A-';
    } else if(90 <= average && average < 95){
        letterGrade = 'A';
    } else if(95 <= average && average <= 100){
        letterGrade = 'A+';
    } else
        letterGrade = 'F';

    return letterGrade;
}

function removeCourse(code){
    if(code.length>1){
        $('#courseCode2').css('border-color', 'green');
        deleteDoc(doc(db, "users/"+student_number+'/coursesTaken', code)).
            then(function(err){
            $('#course'+code).remove();
            window.alert("Course "+code+" has been removed whether it exists or not");
        });
    }else{
        $('#courseCode2').css('border-color', 'red');
        $('#courseCode2').attr("placeholder", 'Please enter a valid code!');
    }

}

function updateCourseTable(sn){
    const query = getDocs(collection(db, "users/"+sn+'/coursesTaken'));
    coursesTaken = 0;
    totalAverage = 0;
    $('#courseTable').html('<tr class="card-header fw-bold "><td>Course Name</td><td>Average</td><td>Letter Grade</td></tr>');

    if(query.empty){
        console.log ('Empty Course Query');
    }
    else{
        query.then(function(query) {
            query.forEach(doc => {
                var code = doc.data().code.toString();
                var average = doc.data().average;
                var letter = doc.data().lettergrade;

                totalAverage -= average*-1;

                $('#currentAve').text(parseFloat((totalAverage / coursesTaken).toPrecision(4)) +'%');

                localStorage.setItem("coursesTaken", query.size);
                localStorage.setItem("totalAverage", totalAverage);
                coursesTaken = localStorage.getItem("coursesTaken");
                totalAverage = localStorage.getItem("totalAverage");


                letter = convertToLetterGrade(average);

                var htmlString = '<tr id=course'+code+'><td>'+code+'</td><td>'+average+'%</td><td>'+letter+'</td></tr>';
                $('#courseTable').append(htmlString);

            })
        })
    }
}
