#!/bin/bash

# 変数
SYMBOLIC_LINK=/home/node_package/grunt-boiler/node_modules
REMOTE_HOST_DEV=sample
REMOTE_HOST_STG=sample
REMOTE_HOST_PRD=sample
REMOTE_PATH_DEV=/sample/
REMOTE_PATH_STG=/sample/
REMOTE_PATH_PRD=/sample/
LOCAL_PATH=${WORKSPACE}/dist/
SRC_PATH=${WORKSPACE}/src/
BACKUP_PATH=${WORKSPACE}/backup/

if [ "${TARGET}" = "dev" ] ; then
    # dev
    REMOTE_HOST=$REMOTE_HOST_DEV
    REMOTE_PATH=$REMOTE_PATH_DEV
elif [ "${TARGET}" = "stg" ] ; then
    # stg
    REMOTE_HOST=$REMOTE_HOST_STG
    REMOTE_PATH=$REMOTE_PATH_STG
elif [ "${TARGET}" = "prd" ] ; then
    # prd
    REMOTE_HOST=$REMOTE_HOST_PRD
    REMOTE_PATH=$REMOTE_PATH_PRD
else
    # error
    echo -e "\n\n*** HOST設定が存在しません ***"
    break
fi

# コマンド
RSYNC="rsync -rlcv --delete"
RSYNC_BACKUP="rsync -rl"

# build
if test -d $SRC_PATH ; then
    # 指定領域のnode_modulesにシンボリックリンクを張る
    if test -d node_modules ; then
        echo -e "\n\n*** node_module is exist ***"
    else
        ln -s $SYMBOLIC_LINK
    fi
    
    # build
    echo -e "\n\n*** build ***"
    grunt
    echo -e "\n\n*** build done ***"
else
    # error
    echo -e "\n\n*** build 対象が存在しません ***"
    break
fi

# rsync
if ${DRYRUN} ; then
    # dryrun
    echo -e "\n\n*** dryrun ***"
    $RSYNC -n $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    echo -e "\n\n*** dryrun done ***"
else
    # failbackジョブのWSの過去の本番バックアップを削除
    if test -d $BACKUP_PATH ; then
        rm -rf $BACKUP_PATH
    fi
    
    # failbackジョブのWSに本番バックアップを作成
    echo -e "\n\n*** backup ***"
    $RSYNC_BACKUP $REMOTE_HOST:$REMOTE_PATH $BACKUP_PATH
    echo -e "\n\n*** backup done ***"
    
    # deploy
    echo -e "\n\n*** deploy ***"
    $RSYNC $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    echo -e "\n\n*** deploy done ***"
fi


