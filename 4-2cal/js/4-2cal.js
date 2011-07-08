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

function init(){
  /* FIXME: disregards background-image set in CSS */ 
  document.getElementById('box').style['background-image'] = 'url(images/back.png)'; 

}

/* date related stuff */
function buildCal() {
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

  var stdout;
    
  var Cal = new Date(); 
  var Today = Cal.getDate();
  var Weekday = (Cal.getDay() + 6) % 7; /* getDay that starts weeks on Sat */
  var Month = Cal.getMonth(); 
  var Year = Cal.getYear(); 

  /* set more visibility for the current day of the week */
  document.getElementById(Days[Weekday]).style['text-decoration'] = 'underline';

  /* print name of the currently printed month, hide the others */
  document.getElementById('month' + Cal.getMonth()).style['background-image'] = 'url(images/back.png)';
  document.getElementById('month' + Cal.getMonth()).style['display'] = 'inline';   
  for(i=0; i < 12; i++) {
     if (i != Cal.getMonth()) {
       document.getElementById('month' + i).style['display'] = 'none';
     }
  } 

  /* build a neat days table: */
  stdout = '<tr>';
  
  /* first blank spaces (starts at 1st) */
  Cal.setDate(1);
  for(i=0; i < (Cal.getDay() + 6) % 7; i++) {
    stdout += '<td>&nbsp;</td>';
  }  

  /* then real days */
  for(i=0; i < MaxDaysPerMonth; i++) {
    if (Cal.getDate() > i) {
      var thisWeekday = (Cal.getDay() + 6) % 7;
      
      if (thisWeekday == 0) {
	stdout += '<tr>';
      }
      
      if (thisWeekday != MaxDaysPerWeek) {
	if (Cal.getDate() == Today) { 
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

  document.write(stdout);

}


function showYear() {
  var Cal = new Date(); 
  alert(Cal.getFullYear());
}

/* EOF */
