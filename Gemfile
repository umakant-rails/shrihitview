source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
# source 'http://rubygems.org'
# git_source(:github) do  |repo_name| 
#   repo_name = " #{repo_name}/#{repo_name}" unless repo_name.include?("/")
#   "http://github.com/#{repo_name}.git"
# end
ruby "3.1.0"
gem 'net-ssh', '>= 6.0.2'
gem 'ed25519', '>= 1.2', '< 2.0'
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
group :development do
  gem 'capistrano'
  gem 'capistrano-nvm', require: false
  gem 'capistrano-npm'
  gem 'capistrano-yarn'
end
