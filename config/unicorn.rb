#サーバ上でのアプリケーションコードが設置されているディレクトリを変数に入れておく
app_path = File.expand_path('../../', __FILE__)

#アプリケーションサーバの性能を決定する
worker_processes 1

#アプリケーションの設置されているディレクトリを指定
working_directory app_path

#Unicornの起動に必要なファイルの設置場所を指定
pid "#{app_path}/tmp/pids/unicorn.pid"

#ポート番号を指定
listen "#{app_path}/tmp/sockets/unicorn.sock"

#エラーのログを記録するファイルを指定
stderr_path "#{app_path}/log/unicorn.stderr.log"

#通常のログを記録するファイルを指定
stdout_path "#{app_path}/log/unicorn.stdout.log"

# ../が一つ増えている
app_path = File.expand_path('../../../', __FILE__)

worker_processes 1
# currentを指定
working_directory "#{app_path}/current"

# それぞれ、sharedの中を参照するよう変更
listen "#{app_path}/shared/tmp/sockets/unicorn.sock"
pid "#{app_path}/shared/tmp/pids/unicorn.pid"
stderr_path "#{app_path}/shared/log/unicorn.stderr.log"
stdout_path "#{app_path}/shared/log/unicorn.stdout.log"