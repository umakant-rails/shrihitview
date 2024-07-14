# config valid for current version and patch releases of Capistrano
lock "~> 3.19.0"

set :application, "shrihitview"
set :repo_url, "git@github.com:umakant-rails/shrihitview.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/apps/shrihitview"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", 'config/master.key'

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor", "storage"



append :linked_files, ".env"
append :linked_dirs, "node_modules"
# set :nvm_type, :user
set :nvm_node, 'v18.20.2'
set :nvm_map_bins, %w{node npm yarn}

# namespace :deploy do
#   task :yarn_deploy do
#   	on roles fetch(:yarn_roles)  do
#   		within fetch(:yarn_target_path, release_path) do
#   			execute fetch(:yarn_bin), 'build'
#   		end
#   	end
#   end
#   before 'symlink:release', :yarn_deploy
# end
set :ssh_options, { :forward_agent => true }


set :npm_flags, '--silent --no-progress --production'
set :build_command, 'npm run build'

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles fetch(:roles) do
      execute "cd #{deploy_to}/current/ && #{build_command}"
    end
  end   
end

after 'deploy:symlink:release', 'deploy:restart'
after 'deploy:publishing', 'deploy:restart'


# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 1

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
