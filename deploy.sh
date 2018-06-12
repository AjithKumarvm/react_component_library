echo 'Preparing..'
version=$(date +"%Y%m%d%H%M")
echo $version
uploadPath="path/$version/"
if [ $1 -a $1 == "live" ]
then
	uploadPath="path/$version/"
	echo "Updating live.. Are you sure bro (Y/N)?"
	read input_var
	if [ $input_var == 'n' -o $input_var == 'N' ]
	then
		echo "exiting"
		exit;
	else
		echo "Proceeding"
	fi
fi
echo 'Uploading..to s3'
aws s3 cp public/dist/ ${uploadPath} --recursive --cache-control "max-age=60"
