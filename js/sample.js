import { db } from "/js/sample-firebase.js";
import { doc, setDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"; 


$(function(){
    console.log('Script is running');
    var fname = "John";
    var lname = "Doe";
    var pw = "12312312";
    var sn = "890123";

    var docData = {
        fname: fname,
        lname: lname,
        pw: pw,
        sn: sn
    }

    setDoc(doc(db, "users", sn), docData);

    const docRef = collection(db, "users");
    const snap = getDocs(docRef);

    snap.then(function(snap){
        snap.forEach(doc => {
            console.log(doc.data().fname);
        })
    })



    $('#delete-btn').click(function(){
        deleteDoc(doc(db, "users", sn));
    });

    $('#loginform').hide();

    $('#loginbtn').click(function(){
        console.log('LOGIN BTN IS CLICKED');
        $('#loginform').show();
    });

    $('#signupbtn').click(function(){
        console.log('SIGNUP BTN IS CLICKED');
        $('#loginform').hide();
    });

});