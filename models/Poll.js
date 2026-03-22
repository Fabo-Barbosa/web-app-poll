const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, index: true },
  
  // Controle de Datas
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now },

  // Status e Visibilidade
  isActive: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: true },
  isAiGenerated: { type: Boolean, default: false },

  // Métricas
  totalSubmissions: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 },
  totalForks: { type: Number, default: 0 },

  // Relacionamentos e Restrições
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  allowedGroup: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
  
  // Lista de ID dos usuários que já votaram (Garante voto único)
  voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // Referência aos tópicos
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
}, { timestamps: true });

// Middleware para atualizar o updatedAt automaticamente
PollSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('poll', PollSchema);