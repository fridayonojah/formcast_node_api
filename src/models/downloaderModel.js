const query = require('../databases/db')
const { multipleColumnSet } = require('../utils/common.utils')

class DownloaderModel {
  find = async (params = {}, file_tbl = 'file') => {
    let sql = `SELECT * FROM ${file_tbl} ORDER BY id DESC`
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { setColumn, values } = multipleColumnSet(params)
    sql += `WHERE ${setColumn}`
    return await query(sql, [...values])
  }

  findOne = async (params, tbl_name = 'file') => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${tbl_name}
    WHERE ${columnSet}`

    const result = await query(sql, [...values])

    return result[0]
  }

  getClientDetails = async (user_id, design_id) => {
    const sql_query = `SELECT * FROM file AS file INNER JOIN client_tbl AS client ON 
            file.design_id = client.design_id WHERE file.design_id = ? AND client.user_id = ?`
    return await query(sql_query, [design_id, user_id])
  }

  create = async (
    { client, project, design_id, user_id },
    tbl_name = 'client_tbl',
  ) => {
    const sql = `INSERT INTO ${tbl_name} 
        (client, project, design_id, user_id) VALUES(?,?,?,?)`

    const result = await query(sql, [client, project, design_id, user_id])
    return result
  }

  downloadedItems = async ({
    client,
    project,
    design_id,
    user_id,
    file_download_name,
  }) => {
    const sql = `INSERT INTO downloads 
        (client, project, design_id, user_id, file_download_name) VALUES(?,?,?,?,?)`

    const result = await query(sql, [
      client,
      project,
      design_id,
      user_id,
      file_download_name,
    ])
    return result
  }

  store_files = async ({ file, design_id, plan }) => {
    const sql = `INSERT INTO file (file, design_id, plan) VALUES(?,?,?)`

    const result = await query(sql, [file, design_id, plan])
    return result
  }

  delete = async (user_id) => {
    const sql = `DELETE FROM client_tbl WHERE user_id = ?`
    const result = await query(sql, [user_id])
    return result
  }
}
module.exports = new DownloaderModel()
