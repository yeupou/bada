#
# FILE DISCONTINUED HERE
# UPDATED VERSION AT
#         https://gitlab.com/yeupou/bada/raw/master/Makefile
#
#                                 |     |
#                                 \_V_//
#                                 \/=|=\/
#                                  [=v=]
#                                __\___/_____
#                               /..[  _____  ]
#                              /_  [ [  M /] ]
#                             /../.[ [ M /@] ]
#                            <-->[_[ [M /@/] ]
#                           /../ [.[ [ /@/ ] ]
#      _________________]\ /__/  [_[ [/@/ C] ]
#     <_________________>>0---]  [=\ \@/ C / /
#        ___      ___   ]/000o   /__\ \ C / /
#           \    /              /....\ \_/ /
#        ....\||/....           [___/=\___/
#       .    .  .    .          [...] [...]
#      .      ..      .         [___/ \___]
#      .    0 .. 0    .         <---> <--->
#   /\/\.    .  .    ./\/\      [..]   [..]
#  / / / .../|  |\... \ \ \    _[__]   [__]_
# / / /       \/       \ \ \  [____>   <____]
#

all: clean cal git

clean:
	mrclean .


cal:
	sh 4-2calconfig.sh
	rm -f 4-2cal.wgt
	cd 4-2cal && zip -r ../4-2cal.zip *
	mv 4-2cal.zip 4-2cal.wgt

git:
	git commit -a -m "Update"
	git push
	git push github


