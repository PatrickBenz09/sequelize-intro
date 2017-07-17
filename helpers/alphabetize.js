module.exports =  function(skor) {
  if (skor === null)
    skor = "empty"
  else if (skor > 85)
    skor = "A";
  else if (skor > 70)
    skor = "B";
  else if (skor > 55)
    skor = "C";
  else if (skor <= 55)
    skor = "E";
  return skor;
}
