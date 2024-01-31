const { Sequelize } = require('sequelize');
const { Tarea, Usuario } = require('./models');

// Relación entre Usuario y Tarea
Tarea.belongsTo(Usuario, { as: 'Creador', foreignKey: 'usuario_creador_id' });
Tarea.belongsTo(Usuario, { as: 'Asignado', foreignKey: 'usuario_asignado_id' });

new Sequelize('db_habitask', 'admin', 'passAWSbd', {
  host: 'database-habitask.c1uw4wgcq9bw.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Consulta todas las tareas en la base de datos
    const tareas = await Tarea.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(tareas),
    };
  } catch (error) {
    console.error('Error al consultar tareas:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
