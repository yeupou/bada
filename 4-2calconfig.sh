#!/bin/sh
#
# Copyright (c) 2010 Mathieu Roy <yeupou--gnu.org>
#
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with this program; if not, write to the Free Software
#   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307
#   USA
#
# $Id: bash-template.sh,v 1.4 2005/04/23 09:52:15 moa Exp $
. ./4-2calversion
VERSION=`expr $VERSION + 1`
echo "VERSION=$VERSION" > 4-2calversion

echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<widget id="4-2cal" version="1.'$VERSION'" width="11em" height="200"
	xmlns="http://www.w3.org/ns/widgets">
 <title>4-2cal</title>
 <description>Calendrier des cycles 4/2.</description>
 <icon src="images/icon.png"/>
 <content src="index.html"/>
 <access network="false"/>
</widget>' > 4-2cal/config.xml

