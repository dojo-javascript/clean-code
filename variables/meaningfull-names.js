// meaningfull names
var d;
// VS
var elapsedTimeInDays;


// pronounceable names
var genymdhns;
var modmdhns;
// VS
var generationTimestamp;
var modifiedTimestamp;


// searcheable names
for(var j=0; j<34; j++) {
  s += (t[j] * 4) / 5;
}
// VS
var realDaysPerIdealDay = 4;
var WORK_DAYS_PER_WEEK = 5;
var sum = 0;
for (var j = 0; j < NUMBER_OF_TASKS; j++) {
    var realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    var realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}

