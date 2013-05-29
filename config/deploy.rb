set :application, "punch-clock"
set :repository,  "https://github.com/mkrogh/punch-clock.git"

set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "momus.boundless.dk"                          # Your HTTP server, Apache/etc
role :app, "momus.boundless.dk"                          # This may be the same as your `Web` server

set :deploy_to, "/var/www/#{application}"
set :use_sudo, false

set :normalize_asset_timestamps, false


task :set_permissions do
  run "chgrp -R www-data #{deploy_to}"
  run "chmod -R g+w #{deploy_to}"
end

after 'deploy', 'set_permissions'
after 'deploy:setup', 'set_permissions'
# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
