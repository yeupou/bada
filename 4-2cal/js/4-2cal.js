/*
   Copyright (c) 2010 Mathieu Roy <yeupou--gnu.org>

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
  /* workaround: bada 1.1 disregards background-image properly set in CSS */ 
  document.getElementById('box').style['background-image'] = 'url(images/back.png)';
 document.getElementById('S').style['text-decoration'] = 'underline: true';

  buildcal();
}


function testLogo()
{
 alert('Hello Bada');
}
 

/* date related stuff */
function buildcal() {
  var Months = new Array(12);
  Months[0] = ("janvier");
  Months[1] = ("février");
  Months[2] = ("mars");
  Months[3] = ("avril");
  Months[4] = ("mai");
  Months[5] = ("juin");
  Months[6] = ("juillet");
  Months[7] = ("août");
  Months[8] = ("septembre");
  Months[9] = ("octobre");
  Months[10] = ("novembre");
  Months[11] = ("décembre");
  
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
  var Today = Calendar.getDate();
  var Weekday = Calendar.getDay();
  
  /* make more visible the current day */
  document.getElementById(Days[Weekday]).style['text-decoration'] = 'underline: true';
  // DBG
  document.getElementById(Days[0]).style['text-decoration'] = 'underline: true';
  document.getElementById('Me').style['text-decoration'] = 'underline: true';

  stdout += '<tr>';
  
  /* then actually list days */
  for(i=0; i < Cal.getDay(); i++) {
    stdout += '<td>&nbsp;</td>';
  }  
  for(i=0; i < MaxDaysPerMonth; i++) {
    if (Cal.getDate() > i) {
      cur = Cal.getDay();
      
      if (cur == 0) {
	stdout += '<tr>';
      }
      
      if (cur != MaxDaysPerWeek) {
	stdout += '<td>' + Cal.getDate() + '</td>';
	
      }

      if (cur == MaxDaysPerWeek) {
	stdout += '</tr>';
      }
      
      Cal.setDate(Cal.getDate()+1);
      
    }
  }

  document.write(stdout);

}


/* EOF */
