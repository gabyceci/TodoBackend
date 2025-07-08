import {Schema, model} from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    completed: {
        type: Boolean,
        default: false,
        validate: {
            validator: function(value) {
                return typeof value === 'boolean';
            },
            message: 'El campo completed debe ser verdadero o falso'
        }
    }
}, {
    timestamps: true
});

export default model("Todo", todoSchema);