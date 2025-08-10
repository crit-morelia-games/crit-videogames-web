function Dates(date) {
  return date.split("T")[0];
}

function Genre(sexo) {
  if (sexo === "M") {
    return "Masculino";
  } else {
    return "Femenino";
  }
}

function Time(time){
  return time.split("T")[1].substring(0,8);
}
export { Dates, Genre, Time };

