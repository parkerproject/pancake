"use strict";


var ComputeDistanceForm = function () {
  this.FORM_ID = 'str-form';
  this.OUTPUT_ID = 'str-result';
};


ComputeDistanceForm.prototype.handleSubmit = function (e) {

  e.preventDefault();

  var data = {};
  var form = document.getElementById('str-form');
  var inputs = form.getElementsByTagName('input');


  for (var i = 0, len = inputs.length; i < len; i++) {
    data[inputs[i].name] = inputs[i].value;
  }


  if (data.str1 == '' || data.str2 == '') {
    return;
  }

  if (!isNaN(Number(data.str1)) || !isNaN(Number(data.str2))) {
    return;
  }

  computeDistanceForm.sendToServer(data);
}

ComputeDistanceForm.prototype.sendToServer = function (data) {

  var self = this;

  this.displayResult('<h5>Calculating distance ...</h5>');

  axios.post('http://127.0.0.1:5000/api', data)
    .then(function (response) {
      self.displayResult(response.data);
    })
    .catch(function (error) {
      throw new Error(error);
    });

}

ComputeDistanceForm.prototype.displayResult = function (response) {

  var display = document.getElementById(this.OUTPUT_ID);

  display.innerHTML = '<h5>The edit distance between the two strings => ' + response + '</h5>';

}

ComputeDistanceForm.prototype.init = function () {

  var formEl = document.getElementById(this.FORM_ID);

  var outputEl = document.getElementById(this.OUTPUT_ID);

  addEvent(formEl, 'submit', this.handleSubmit);

}


// var Pancake = window.Pancake || {};

// Pancake.computeDistanceForm = (function () {
//   FORM_ID: 'str-form',
//   OUTPUT_ID: 'str-result',

//   handleSubmit: function (e) {
//     e.preventDefault();

//     var data = {};
//     var inputs = Pancake.computeDistanceForm.formEl.getElementsByTagName('input');

//     for (var i = 0, len = inputs.length; i < len; i++) {
//       data[inputs[i].name] = inputs[i].value;
//     }


//     if (data.str1 == '' || data.str2 == '') {
//       console.log("We need two strings to compute distance");
//       return;
//     }

//     Pancake.computeDistanceForm.sendToServer(data);
//   },

//   sendToServer: function (data) {
//     Pancake.computeDistanceForm.displayResult('<h5>Calculating distance ...</h5>');
//     axios.post('http://127.0.0.1:5000/api', data)
//       .then(function (response) {
//         Pancake.computeDistanceForm.displayResult(response.data);
//       })
//       .catch(function (error) {
//         throw new Error(error);
//       });
//   },

//   displayResult: function (response) {
//     Pancake.computeDistanceForm.outputEl.innerHTML = '<h5>The edit distance between the two strings => ' + response + '</h5>';
//   },

//   init: function () {
//     Pancake.computeDistanceForm.formEl = document.getElementById(Pancake.computeDistanceForm.FORM_ID);
//     Pancake.computeDistanceForm.outputEl = document.getElementById(Pancake.computeDistanceForm.OUTPUT_ID);
//     addEvent(Pancake.computeDistanceForm.formEl, 'submit', Pancake.computeDistanceForm.handleSubmit);
//   }
// });

var computeDistanceForm = new ComputeDistanceForm();
addLoadEvent(computeDistanceForm.init());