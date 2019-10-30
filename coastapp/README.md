# WordPress Local Environment Setup for the Coast App Site

To develop the Coast App site locally, you can use whatever local environment works for you. I’ll document a WordPress Docker setup for this Readme.

## Instructions
Download Docker. I’m using the desktop application for Mac.

* Clone this repo, coast-app-wp
* Configure your docker-compose.yml file
* In terminal, jump into the directory you just cloned
* Run docker-compose up -d

### WordPress
Docker will handle the WordPress core files and we'll just be working with the wp-content directory, which includes our plugins and theme directories. In terms of Git, we only need to track this directory since it is the only one we'll be making changes to and WP Engine also handles our WP core files.

**Note:** We have a separate repo with WP Engine. These repos should be maintained together for the time being. So we will need to push code to Github as well as WP Engine. See Coast App Site Development and Workflow for more information about this (link below).

### Database
You can access the database by SSHing into your Docker database container and logging in to mySQL  
* docker exec -it {wp db container name} bash -l  
* mysql -uroot -p{password}

To import a database
* download a dump of the database from WP Engine
* docker exec -i {db container id} mysql -uroot -p {db name} < /location/to/dump.sql **OR** 
* install phpMyAdmin  

### Development Tools
* ESLint
* StyleLint
* Webpack
* WP-CLI

For now, we will check-in prod and dev scripts. If we set up a deploy tool with WP Engine we can exclude the prod scripts. For WP-CLI, you can install this with your wordpress image. Just modify your docker-compose.yml file.

* image: conetix/wordpress-with-wp-cli

You'll access the wp-cli with  
* docker-compose exec wordpress wp --info

And set up an alias if you'd like
* alias wp="docker-compose exec wordpress wp"
* wp --info

You may need to update core  
* wp core update

If you're importing a database, you can run a search-replace on URLs
* wp search-replace 'https<nolink>://coastapp.wpengine.com/' 'http<nolink>://localhost:8000/'

### Scripts to run
You can run these separately or with npm run build:prod
* npm run lint:fix
* npm run lint:sass

To watch files, run 
* npm run watch:dev

And to build,
* npm run build:prod

With npm run build:prod, you're running your linters and then webpack.

### Deployment
We have three environments--dev, staging, and production. I just deploy to development and then migrate everything to staging and then migrate again to production. WP Engine has an easy way for us to do that.

Add your dev remote
* git remote add development git@git.wpengine.com:production/coastdev.git

Deploy via git
* git push development master


## Resources
* <a href="https://drive.google.com/open?id=1Mgy8sYCdmvABNpBWOi429Ez_cPHvTvYgX0nMD48Lgt8" target="_blank">Coast App Site Development and Workflow</a>
* <a href="https://www.docker.com/" target="_blank">Docker</a>
* <a href="https://docs.docker.com/compose/wordpress/" target="_blank">Quickstart: Compose and Wordpress</a>
* <a href="https://developer.wordpress.org/cli/commands/" target="_blank">WP-CLI Commands</a>
* <a href="https://my.wpengine.com/" target="_blank">WP-Engine</a>