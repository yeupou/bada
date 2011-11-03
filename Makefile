
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


