// components/SimpleModal.tsx
import React from 'react'

interface SimpleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}

const ConfirmationModel: React.FC<SimpleModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
        <p className="mb-4">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModel
