
all: bgdcal


bgdcal:
	mrclean BGDcal
	rm -f BGDcal.wgt
	cd BGDcal && zip -r ../BGDcal.zip *
	mv BGDcal.zip BGDcal.wgt
	git commit -a -m "Update"

