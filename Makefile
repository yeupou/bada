
all: cal git


cal:
	mrclean 4-2cal
	rm -f 4-2cal.wgt
	cd 4-2cal && zip -r ../4-2cal.zip *
	mv 4-2cal.zip 4-2cal.wgt

git:
	git commit -a -m "Update"
	git push

