#!/bin/bash

# 変数
SYMBOLIC_LINK=/home/node_package/sample/node_modules
REMOTE_HOST_DEV=
REMOTE_HOST_STG=
REMOTE_HOST_PRD=
REMOTE_PATH=/sample/
LOCAL_PATH=${WORKSPACE}/dist/
SRC_PATH=${WORKSPACE}/src/
BACKUP_PATH=${WORKSPACE}/backup/

if [ ${TARGET} -eq dev ] ; then
    # dev
    REMOTE_HOST=$REMOTE_HOST_DEV
elif [ ${TARGET} -eq stg ] ; then
    # stg
    REMOTE_HOST=$REMOTE_HOST_STG
elif [ ${TARGET} -eq prd ] ; then
    # prd
    REMOTE_HOST=$REMOTE_HOST_PRD
else
    # error
    echo -e "\n\n*** HOST設定が存在しません ***"
    break
fi

# コマンド
RSYNC_OVERRIDE="rsync -rlcv --delete"
RSYNC="rsync -rlcv --ignore-existing"
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
    if ${OVERRIDE} ; then
        $RSYNC_OVERRIDE -n $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    else
        $RSYNC -n $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    fi
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
    if ${OVERRIDE} ; then
        $RSYNC_OVERRIDE $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    else
        $RSYNC $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
    fi
    echo -e "\n\n*** deploy done ***"
fi


