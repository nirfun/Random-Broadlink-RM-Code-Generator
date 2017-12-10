function startDecode() {



  var b64 = $("#usercode").val();

  var hex = base64ToHex(b64)

  $("#hex").val(hex);

  var hexArr = hex.split(" ");

  var strippedBroadlink = hexArr.slice(4);


  var normilized = normilizeArray(strippedBroadlink);

  var startHeader = "0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c89";

  var joined = normilized.join("");

  var codeStartIndex = joined.indexOf(startHeader) + startHeader.length;


  var code = joined.substr(codeStartIndex);
  var singleCode = code.substr(0, 67 * 4);

  var singleSplitted = singleCode.match(/.{1,4}/g);

  $("#singlehex").val(singleSplitted.join(" "));



  var bitstream = singleSplitted.map(toBits).join("");
  $("#fullbits").val(bitstream);


  var encrypted = bitstream.substr(33)

  var fixed = bitstream.substr(0,33)

  var rv = fixed.substr(0, 2);
  var buttons = fixed.substr(2, 4);
  var sn = fixed.substr(4, 28);

  $("#encpart").val(encrypted);
  $("#fixedpart").val(fixed);
  $("#rv").val(rv);
  $("#buttons").val(buttons);
  $("#sn").val(sn);




  console.log(encrypted);
  console.log(fixed);

  // var html = '<tr scope="row"><td>' + type + '</td><td>' + generated.regular + '</td><td>' + generated.long + '</td></tr>';

  // $('#restable').append(html);
}

function toBits(byte) {
  if(byte == "0c18"){
    return "1";
  }
  if(byte == "180c"){
    return "0";
  }
}


function normilizeArray(arr) {
  return arr.map(normilizeByte)
}


function normilizeByte(byte) {
  if(is0c(byte)){
    return "0c";
  }else if(is18(byte)){
    return "18";
  }else if(is89(byte)){
    return "89";
  }

  else{
    return byte;
  }
}


function is0c(byte){
  var is = Array("0c", "0d", "0e", "0f", "0b", "0a", "09");
  return (is.indexOf(byte) > -1);
}

function is18(byte){
  var is = Array("19", "1a", "1b", "1c", "18", "17", "16");
  return (is.indexOf(byte) > -1);
}

function is89(byte){
  var is = Array("89", "8a", "8b", "8c", "88", "87", "86");
  return (is.indexOf(byte) > -1);
}
