const query = require('../databases/db')
const { multipleColumnSet } = require('../utils/common.utils')

class DownloaderModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM files_tbl ORDER BY id DESC`
    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { setColumn, values } = multipleColumnSet(params)
    sql += `WHERE ${setColumn}`
    return await query(sql, [...values])
  }

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * FROM file
    WHERE ${columnSet}`

    const result = await query(sql, [...values])

    return result[0]
  }

  getClientDetails = async (user_id, design_id) => {
    const sql_query = `SELECT * FROM file AS file INNER JOIN client_tbl AS client ON 
            file.design_id = client.design_id WHERE file.design_id = ? AND client.user_id = ?`
    return await query(sql_query, [design_id, user_id])
  }

  create = async ({ client, project, design_id, user_id }) => {
    const sql = `INSERT INTO client_tbl 
        (client, project, design_id, user_id) VALUES(?,?,?,?)`

    const result = await query(sql, [client, project, design_id, user_id])
    return result
  }
}
module.exports = new DownloaderModel()
