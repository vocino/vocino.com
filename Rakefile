require 'rubygems'

desc 'Deploy to Github Pages'
task :deploy do
  puts '## Deploying to Github Pages'

  puts '## Generating site'
  system 'bundle exec grunt build'

  cd 'build' do
    system 'git add -A'

    message = "Site updated at #{Time.now.utc}"
    puts "## Commiting: #{message}"
    system "git commit -m \"#{message}\""

    puts '## Pushing generated site'
    system 'git push'

    puts '## Deploy Complete!'
  end
end
