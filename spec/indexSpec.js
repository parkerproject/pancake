describe("when compute distance form is submitted", function () {
  /**
   * public computeDistanceForm.
   * @constructor
   */

  var button = $('.button');
  var $form;
  var str1 = $('input[name=str1]');
  var str2 = $('input[name=str2]');


  it("prevents submission to server if string 1 empty", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val('');
    str2.val('test');

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).not.toHaveBeenCalled();

  });

  it("prevents submission to server if string 2 empty", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val('test');
    str2.val('');

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).not.toHaveBeenCalled();

  });

  it("Allow submission to server for computation if string 1 && string 2 is NOT empty", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val('Parker');
    str2.val('Ituk');

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).toHaveBeenCalled();

  });

  it("prevent submission to server if string 1 value is NUMBER", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val(8);
    str2.val('Ituk');

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).not.toHaveBeenCalled();

  });

  it("prevent submission to server if string 2 value is NUMBER", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val('Parker');
    str2.val(8);

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).not.toHaveBeenCalled();

  });

  it("prevent submission to server if string 1 && string2 value are NUMBERS", function () {

    spyOn(computeDistanceForm, 'sendToServer');

    str1.val(8);
    str2.val(8);

    button.trigger("click");

    expect(computeDistanceForm.sendToServer).not.toHaveBeenCalled();

  });

  it("Expect displayResult() to be called once submission to server is allowed", function () {

    spyOn(computeDistanceForm, 'displayResult');

    str1.val('Parker');
    str2.val('Ituk');

    button.trigger("click");

    expect(computeDistanceForm.displayResult.calls.length).toEqual(1);

  });

  it("Expect results to be displayed", function () {

    spyOn(computeDistanceForm, 'displayResult');

    var display = $('#str-result').text();

    str1.val('Parker');
    str2.val('Ituk');

    button.trigger("click");

    expect(computeDistanceForm.displayResult).toHaveBeenCalled();
    expect(display).not.toBeNull();

  });

});