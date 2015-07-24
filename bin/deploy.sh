#!/bin/bash

# 変数
SYMBOLIC_LINK=/home/node_package/dishoftheyear/node_modules
REMOTE_PATH=fileup01:/home/nfs/gri/docroot/dishoftheyear/
LOCAL_PATH=${WORKSPACE}/_src/
BACKUP_PATH=${WORKSPACE}/_backup/


# コマンド
RSYNC_OVERRIDE="rsync -rlcv --delete"
RSYNC="rsync -rlcv --ignore-existing"
RSYNC_BACKUP="rsync -rl"


# 指定領域のnode_modulesにシンボリックリンクを張る
if test -d node_modules ; then
    echo "node_module is exist."
else
    ln -s $SYMBOLIC_LINK
fi


# failbackジョブのWSの過去の本番バックアップを削除
if test -d $BACKUP_PATH ; then
    rm -rf $BACKUP_PATH
fi


# failbackジョブのWSに本番バックアップを作成
echo -e "\n\n*** backup ***"
$RSYNC_BACKUP $REMOTE_PATH $BACKUP_PATH


# build
echo -e "\n\n*** build ***"
grunt


# rsync
if ${DRYRUN} ; then
    echo -e "\n\n*** dryrun ***"
    if ${OVERRIDE} ; then
        $RSYNC_OVERRIDE -n $LOCAL_PATH $REMOTE_PATH
    else
        $RSYNC -n $LOCAL_PATH $REMOTE_PATH
    fi
else
    echo -e "\n\n*** deploy ***"
    if ${OVERRIDE} ; then
        $RSYNC_OVERRIDE $LOCAL_PATH $REMOTE_PATH
    else
        $RSYNC $LOCAL_PATH $REMOTE_PATH
    fi
fi


