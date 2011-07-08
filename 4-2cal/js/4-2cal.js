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

function init(){
  /* FIXME: disregards background-image set in CSS */ 
  document.getElementById('box').style['background-image'] = 'url(images/back.png)'; 
  document.getElementById('buttons').style['background-image'] = 'url(images/back2.png)'; 
  document.getElementById('config').style['background-image'] = 'url(images/back2.png)'; 
  document.getElementById('configtitle').style['background-image'] = 'url(images/back.png)'; 

  buildCal();
}

function resetCal(){
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
  if (monthAsked == undefined) {
    document.getElementById(Days[Weekday]).style['text-decoration'] = 'underline';
  } else {    
    document.getElementById(Days[Weekday]).style['text-decoration'] = 'none';    
  }

  /* print name of the currently printed month, hide the others */
  document.getElementById('month' + Month).style['background-image'] = 'url(images/back.png)';
  document.getElementById('month' + Month).style['display'] = 'inline';   
  for(i=0; i < 12; i++) {
     if (i != Month) {
       document.getElementById('month' + i).style['display'] = 'none';
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
  for(i=0; i < MaxDaysPerMonth; i++) {
    if (Cal.getDate() > i) {
      var thisWeekday = (Cal.getDay() + 6) % 7;
      
      if (thisWeekday == 0) {
	stdout += '<tr>';
	rows = rows + 1;
      }
      
      if (thisWeekday != MaxDaysPerWeek) {
	if (Cal.getDate() == Today && monthAsked == undefined) { 
	  stdout += '<td class="underline">' + Cal.getDate() + '</td>';
	} else {
	  stdout += '<td>' + Cal.getDate() + '</td>';
	}
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

function editConfig() {
  document.getElementById('box').style['display'] = 'none'; 
  document.getElementById('buttons').style['display'] = 'none'; 
  document.getElementById('config').style['display'] = 'block'; 

}

function setConfig(groupAsked) {
  document.getElementById('box').style['display'] = 'block'; 
  document.getElementById('buttons').style['display'] = 'block'; 
  document.getElementById('config').style['display'] = 'none';   
}

/* EOF */
