//import { getDatabase, ref, set } from "firebase/database";

function ValidationEvent() {
  console.log("uid of current user is" + currentUserID);

  var title1 = document.getElementById("groupTitle").value;
  var type1 = document.getElementById("groupType").value;
  var building1 = document.getElementById("building").value;
  var startTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;
  //var length = document.getElementById("length").value;
  var participants1 = document.getElementById("participants").value;
  var description1 = document.getElementById("description").value;

  let today = new Date();
  let start = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate()) + "T" + startTime + ":00.000");
  //console.log(start);
  let end = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate()) + "T" + endTime + ":00.000");
  if (end < today) {
    end.setDate(end.getDate() + 1);
  }
  if (start < today) {
    start.setDate(end.getDate() + 1);
  }

  //new Date('2022-05-14T07:06:05.123')

  //end.setDate(end.getDate() + 1); //adds one day

  //gotta figure out how to use the inputted endTime but for now this is fine
  //end.setHours(end.getHours() + parseInt(length)); //adds 5 hours

  var groupsRef = db.collection("groups");
  var currentUserRef = db.collection("users").doc(currentUserID);
  groupsRef.add({
    title: title1,
    groupType: type1,
    building: building1,
    participants: participants1,
    starttime: start,
    endtime: end,
    currentParticipants: 1,
    description: description1,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  }, (error) => {
    if (error) {
      // The write failed...
    } else {
      //console.log("this was executed");
      window.open("group.html", "_self");
    }
  }).then((docRef) => {
    if (inGroup(currentUserRef) == true) { //if the currentGroup is not null
      console.log("was currently in a group thats CRAAZY");
      leaveGroup(currentUserRef) //leave the current group
      .then((idk) => {
        currentUserRef.update({
          currentGroup: docRef.id //join the newly created group
        }).then((kdi) => {
          window.open("group.html", "_self");
        });
      });
    } else {
    currentUserRef.update({
      currentGroup: docRef.id //join the newly created group
    }).then((idk) => {
      window.open("group.html", "_self");
    });
  }
  });
}

async function inGroup(userRef) {
  await userRef.get().then((snap) => {
    console.log("returning: " + (snap.data().currentGroup != null));
    return snap.data().currentGroup != null;
  });
}

function leaveGroup(currentUserRef) {
  console.log("this has never been printed");
  var groupsRef;
  currentUserRef.get().then((snap) => {
    groupsRef = snap.data().currentGroup;
  }).then((idk)=>{
    console.log(groupsRef);
    var GroupRef = db.collection("groups").doc(groupsRef);
  
    GroupRef.update({
      currentParticipants: firebase.firestore.FieldValue.increment(-1),
    });
  })
}

var modal = document.getElementById('create-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Confirms validity of user input and displays confirmation modal if 
document.querySelector("#createButton").addEventListener("click", function (e){
  e.preventDefault();
  // let title1 = document.getElementById("groupTitle");
  // let type1 = document.getElementById("groupType");
  // let building1 = document.getElementById("building");
  // let startTime = document.getElementById("startTime");
  // let endTime = document.getElementById("endTime");
  // //let length = document.getElementById("length");
  // let participants1 = document.getElementById("participants");
  // let description1 = document.getElementById("description");

  // let titleValid = title1.checkValidity();
  // let typeValid = type1.checkValidity();
  // let buildingValid = building1.checkValidity();
  // let startTimeValid = startTime.checkValidity();
  // let endTimeValid = endTime.checkValidity();
  // let participants1Valid = participants1.checkValidity();
  // let description1Valid = description1.checkValidity();

  let isValid = document.querySelector("#create-group-form").reportValidity();

  if(isValid){
    document.getElementById('create-modal').style.display='flex';
  }
});