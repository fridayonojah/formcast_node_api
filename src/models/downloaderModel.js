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

  findOne = async (params, tbl_name = 'files') => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM ${tbl_name}
    WHERE ${columnSet}`

    const result = await query(sql, [...values])

    return result.fieldCount == 0
      ? 'Something went wrong. Please contact our admin'
      : result[0]
  }

  getClientDetails = async (order_code) => {
    const sql_query = `SELECT orders.client, orders.project, orders.order_code,
     orders.design_id, files.file
        FROM orders 
        INNER JOIN files 
        ON orders.design_id = files.design_id WHERE orders.order_code = ?`
    return await query(sql_query, [order_code])
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

  downloadedItems = async ({ order_code, file_process_name }) => {
    const sql = `INSERT INTO downloads 
        (order_code, file_process_name) VALUES(?,?)`

    const result = await query(sql, [order_code, file_process_name])
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
