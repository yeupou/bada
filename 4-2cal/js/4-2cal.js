/*
   Copyright (c) 2011 Mathieu Roy <yeupou--gnu.org>

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307
   USA
*/

/* for future ref */
shownMonth = undefined;
shownYear = undefined;
group = undefined;

function init() {
  /* FIXME: disregards background-image set in CSS */ 
  document.getElementById('box').style['background-image'] = 'url(images/back.png)'; 
  document.getElementById('buttons').style['background-image'] = 'url(images/back2.png)'; 
  document.getElementById('config').style['background-image'] = 'url(images/back2.png)'; 
  document.getElementById('configtitle').style['background-image'] = 'url(images/back.png)'; 
  
  /* obtain cookie-stored config */
  var cookieSplit = document.cookie.split(';'); 
  for(i=0; i < cookieSplit.length; i++) {
    var c = cookieSplit[i];
    while (c.charAt(0) == ' ') { 
      c = c.substring(1,c.length);
    }
    if (c.indexOf('groupPref=') == 0) {
      group = c.substring('groupPref='.length,c.length);
    }
  }

  buildCal();
}

function resetCal() {
  shownMonth = undefined;
  shownYear = undefined;
  buildCal();  
}

/* date related stuff */
function buildCal(monthAsked) {

  var Months = new Array(12);
  
  var Days = new Array(7);
  Days[0] = ("L");
  Days[1] = ("Ma");
  Days[2] = ("Me");
  Days[3] = ("J");
  Days[4] = ("V");
  Days[5] = ("S");
  Days[6] = ("D");
  
  var MaxDaysPerWeek = 7;
  var MaxDaysPerMonth = 31;

  var stdout = '<tr>';
    
  var Cal = new Date(); 
  /* set data: if unset, assume we want current year and month */
  var Today = Cal.getDate();
  var Weekday = (Cal.getDay() + 6) % 7; /* getDay that starts weeks on Sat */
  if (shownMonth == undefined) { shownMonth = Cal.getMonth(); }
  var Month = shownMonth;
  if (shownYear == undefined) { shownYear = Cal.getFullYear(); }
  var Year = shownYear;


  /* check if asking for month other than current one */
  if (monthAsked != undefined) {
    Month = Month + monthAsked;
    
    /* other year asked */
    if (Month > 11 && monthAsked > 0) {
      Year = Year + 1;
      shownYear = Year;
      Month = 0;
    }
    if (Month < 0 && monthAsked < 0) {
      Year = Year - 1;
      shownYear = Year;
      Month = 11;
    }
 
    /* for future ref */
    shownMonth = Month;
  }

  Cal.setMonth(Month);
  Cal.setYear(Year);

  /* set more visibility for the current day of the week of current month */
  /* FIXME: weird results with Bada, forget this for now.
    if (monthAsked == undefined) {
    document.getElementById(Days[Weekday]).style['text-decoration'] = 'underline';
  } else {    
    document.getElementById(Days[Weekday]).style['text-decoration'] = 'none';    
    }*/

  /* print name of the currently printed month, hide the others */
  document.getElementById('month' + Month).style['background-image'] = 'url(images/back.png)';
  document.getElementById('month' + Month).style['display'] = 'inline';   
  for(i=0; i < 12; i++) {
     if (i != Month) {
       document.getElementById('month' + i).style['display'] = 'none';
     }
  } 

  /* check where we are exactly cycle wise when starting the month 
     (the point is to do one check and increment a counter, instead of
     computing for each day) */
  cycleAMPM = undefined;
  cycleDay = undefined;      
  if (group != undefined) {
    /* we decided to work with date references as of june 2011, so
     this wont work for any date before july. Squish it here */
    if (Year > 2011 || Month > 5) {
      guessCycle(new Date(Year,Month,1,12,0,0));
    }
  }

  /* build a neat days table:
     keep tracks of the number of rows, so the interface stays consistent
     over months */
  var rows = 1;
  
  /* first blank spaces (starts at 1st) */
  Cal.setDate(1);
  for(i=0; i < (Cal.getDay() + 6) % 7; i++) {
    stdout += '<td>&nbsp;</td>';
  }  
  /* if no blank column necessary, decrement row count */
  if (stdout == '<tr>') { rows = 0; }

  /* then real days */
  var thisWeekday = (Cal.getDay() + 6) % 7;
  for (i=0; i < MaxDaysPerMonth; i++) {
    if (Cal.getDate() > i) {
      var thisWeekday = (Cal.getDay() + 6) % 7;
      
      if (thisWeekday == 0) {
	stdout += '<tr>';
	rows = rows + 1;
      }
      
      if (thisWeekday != MaxDaysPerWeek) {
	
	/* if possible, prepare the relevant class of the day field */
	var dayClass = undefined;
	if (cycleDay != undefined && cycleAMPM != undefined) {
	  /* RLRC stays blank */
	  if (cycleDay < 5) {
	    if (cycleAMPM == 'PM') { dayClass = 'pm'; }
	    if (cycleAMPM == 'AM') { dayClass = 'am'; }
	  }

	  cycleDay++;
	  if (cycleDay > 6) { 
	    cycleDay = 1; 
	    if (cycleAMPM == 'PM') {
	      cycleAMPM = 'AM';
	    } else {
	      cycleAMPM = 'PM';
	    }
	  }
	} 
	
	stdout += '<td';
	
	if (dayClass != undefined) {
	  stdout += ' class="'+dayClass+'"';
	}
	stdout += '>';
	

	if (Cal.getDate() == Today && monthAsked == undefined) { 
	  stdout += '<span class="underline">' + Cal.getDate() + '</span>';
	} else {
	  stdout += Cal.getDate();
	}
	
	stdout += '</td>';

      }
      
      if (thisWeekday == MaxDaysPerWeek) {
		stdout += '</tr>';
      }
      
      Cal.setDate(Cal.getDate()+1);
      
    }
  }
  
  /* Force 6 rows table */
  for(i=rows; i < 6; i++) {
    stdout += '<tr><td>&nbsp;</td></tr>';
  }
  
  document.getElementById("cal").innerHTML=stdout;

}

function showYear() {
  alert(shownYear);
}


function guessCycle(ToCompareDate) {
  /* compare sent date with the reference date: */
  
  var RefDate;
  if (group == undefined) { return; }
  if (group == 1) { RefDate = new Date(2011,5,26,12,0,0); }
  if (group == 2) { RefDate = new Date(2011,5,22,12,0,0); }
  if (group == 3) { RefDate = new Date(2011,5,30,12,0,0); }

  /* result in days */
  var Delta = (ToCompareDate.getTime() - RefDate.getTime())/86400000;

  var counterAMPM = 'PM';
  var counterDayOfCycle = 1;
  for (day=0; day < Delta; day++) {
    counterDayOfCycle++;
    if (counterDayOfCycle > 6) { 
      counterDayOfCycle = 1; 
      if (counterAMPM == 'PM') {
	counterAMPM = 'AM';
      } else {
	counterAMPM = 'PM';
      }
    }
  }

  cycleAMPM = counterAMPM;
  cycleDay = counterDayOfCycle;      
  
  return;  
}

function editConfig() {
  document.getElementById('box').style['display'] = 'none'; 
  document.getElementById('buttons').style['display'] = 'none'; 
  document.getElementById('config').style['display'] = 'block'; 

}

function setConfig(groupAsked) {
  /* store config in cookie */
  var Expires = new Date();
  Expires.setTime(Expires.getTime()+(172800000000));
  document.cookie = 'groupPref='+groupAsked+'; expires='+Expires.toGMTString()+'; path=/';

  /* redraw calendar */
  group = groupAsked;
  buildCal(0); 

  document.getElementById('box').style['display'] = 'block'; 
  document.getElementById('buttons').style['display'] = 'block'; 
  document.getElementById('config').style['display'] = 'none';   
}

/* EOF */
