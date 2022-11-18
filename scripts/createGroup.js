//import { getDatabase, ref, set } from "firebase/database";

function ValidationEvent() {
    console.log("uid of current user is" + currentUserID);

    var title1 = document.getElementById("groupTitle").value;
    var type1 = document.getElementById("groupType").value;
    var building1 = document.getElementById("building").value;
    //var startTime = document.getElementById("startTime").value;
    //var endTime = document.getElementById("endTime").value;
    var length = document.getElementById("length").value;
    var participants1 = document.getElementById("participants").value;
    var description1 = document.getElementById("description").value;

    var end = new Date();
    //end.setDate(end.getDate() + 1); //adds one day

//gotta figure out how to use the inputted endTime but for now this is fine
    end.setHours(end.getHours() + parseInt(length)); //adds 5 hours

    var groupsRef = db.collection("groups");
    var currentUserRef = db.collection("users").doc(currentUserID);
    groupsRef.add({
        title: title1,
        groupType: type1,
        building: building1,
        participants: participants1,
        // starttime: startTime,
        endtime: end,
        currentParticipants: 1,
        description: description1,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
      }, (error) => {
        if (error) {
          // The write failed...
        } else {
            console.log("this was executed");
            window.open("group.html", "_self");
        }
      }).then((docRef) => {
        if(currentUserRef.currentGroup != null) { //if the currentGroup is not null
          console.log("leaving current group"); //leave the current group
        }
        currentUserRef.update({
            currentGroup: docRef.id //join the newly created group
        });
        window.open("group.html", "_self");
      });
}