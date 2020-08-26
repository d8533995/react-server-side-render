import React, { useState, useEffect } from 'react'
import {
  Button, Modal, Input, message
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import styles from './index.less'
import gwRequest from '../../utils/request'
import { Link } from 'react-router-dom'

export default function List () {
  const [deleteModal, setDeleteModal] = useState()
  const [addModal, setAddModal] = useState()
  const [editModal, setEditModal] = useState()
  const [list, setList] = useState()

  function getList () {
    gwRequest({
      path: '/api/project/item/list'
    }).then((res) => {
      setList(res.data.data || [])
    })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.btns}>
          <Button
            type="primary"
            onClick={() => setAddModal(true)}
          >添加项目
          </Button>
        </div>
        <ul className={styles.list}>
          {list && list.map((item) => (
            <li className={styles.item} key={item.adId}>
              <Link to={`/monitor/${item.id}`}>
                <h3 className={styles.title}>
                  {item.display_name}
                  <EditOutlined
                    style={{ marginLeft: 5 }}
                    onClick={(e) => {
                      e.preventDefault()
                      setEditModal({ adTitle: item.display_name, adId: item.id, projectName: item.project_name, desc: item.c_desc })
                    }}
                  />
                  <div>{item.project_name}</div>
                </h3>
                <a
                  onClick={(e) => { e.preventDefault(); setDeleteModal(item.id) }}
                  className={styles.delete}
                >删除
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* 添加modal */}
      {addModal && (
        <AddModal
          onReFresh={getList}
          onCancel={() => setAddModal(false)}
        />
      )}
      {/* 修改modal */}
      {editModal && (
        <EditModal
          onReFresh={getList}
          estateName={editModal.adTitle}
          adId={editModal.adId}
          defaultProject={editModal.projectName}
          defaultDesc={editModal.desc}
          onCancel={() => setEditModal(false)}
        />
      )}
      {/* 删除modal */}
      {deleteModal && (
        <DelModal
          adId={deleteModal}
          onReFresh={getList}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </>
  )
}

function EditModal ({
  estateName, adId, onCancel, onReFresh, defaultProject, defaultDesc
}) {
  const [displayName, setDisplayName] = useState(estateName)
  const [projectName, setProjectName] = useState(defaultProject)
  const [desc, setDesc] = useState(defaultDesc)
  function handleSave () {
    gwRequest({
      method: 'POST',
      path: '/api/project/item/update',
      json: {
        id: adId,
        display_name: displayName,
        project_name: projectName,
        c_desc: desc
      }
    }).then(() => {
      message.success('修改成功')
      onReFresh()
      onCancel()
    })
  }
  return (
    <Modal
      closable={false}
      title="修改项目名称"
      visible
      onOk={handleSave}
      onCancel={onCancel}
      okText="保存"
      cancelText="取消"
      okButtonProps={{ disabled: !displayName }}
    >
      <Input
        placeholder="项目名称"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <br /><br />
      <Input
        placeholder="appId"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <br /><br />
      <Input
        placeholder="描述"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
    </Modal>
  )
}

function AddModal ({ onCancel, onReFresh }) {
  const [displayName, setDisplayName] = useState()
  const [projectName, setProjectName] = useState()
  const [desc, setDesc] = useState()

  function handleAdd () {
    gwRequest({
      method: 'POST',
      path: '/api/project/item/add',
      json: {
        displayName,
        projectName,
        cDesc: desc
      }
    }).then(() => {
      message.success('添加成功')
      onReFresh()
      onCancel()
    })
  }
  return (
    <Modal
      closable={false}
      title="添加项目"
      visible
      onOk={handleAdd}
      onCancel={onCancel}
      okText="添加"
      cancelText="取消"
      okButtonProps={{ disabled: !displayName || !projectName || !desc }}
    >
      <Input
        placeholder="名称"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <br /><br />
      <Input
        placeholder="appId"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <br /><br />
      <Input
        placeholder="描述"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
    </Modal>
  )
}

function DelModal ({ onCancel, onReFresh, adId }) {
  const [delConfirmValue, setDelConfirmValue] = useState()
  function handleDelete () {
    gwRequest({
      path: '/api/project/item/delete',
      qs: {
        id: adId
      }
    }).then(() => {
      message.success('删除成功')
      onReFresh()
      onCancel()
    })
  }
  return (
    <Modal
      visible
      title="删除项目"
      closable={false}
      onOk={handleDelete}
      onCancel={onCancel}
      okText="删除"
      cancelText="取消"
      okButtonProps={{ disabled: delConfirmValue !== '确认删除' }}
    >
      <div>请输入“确认删除”</div>
      <Input value={delConfirmValue} onChange={(e) => setDelConfirmValue(e.target.value)} />
    </Modal>
  )
}
