import pg from 'pg';
const { Pool } = pg;

async function main() {
  const host = process.env.DATABASE_HOST || '51.91.159.188';
  const pool = new Pool({
    host,
    port: parseInt(process.env.DATABASE_PORT) || 5433,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG',
    database: process.env.DATABASE_NAME || 'postgres'
  });

  const client = await pool.connect();
  try {
    console.log('Connecting to database...');
    const res = await client.query('SELECT * FROM generacion_docs');
    console.log('Total rows found:', res.rows.length);
    res.rows.forEach((row, i) => {
      let formularioObj = row.formulario;
      if (typeof row.formulario === 'string') {
        try {
          formularioObj = JSON.parse(row.formulario);
        } catch (e) {}
      }
      
      if (formularioObj && typeof formularioObj === 'object') {
        if (formularioObj.doc_autorizacion_rep) {
          console.log(`\nRow ${i+1} (${row.nombre}):`);
          Object.keys(formularioObj).forEach(k => {
            if (k.startsWith('doc_')) {
              console.log(`  ${k}: ${typeof formularioObj[k] === 'string' ? formularioObj[k].substring(0, 50) : formularioObj[k]}`);
            }
          });
        }
      }
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
