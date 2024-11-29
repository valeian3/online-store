import { FC, ReactNode, MouseEvent } from 'react'

import { X } from 'lucide-react'

interface ModalProps {
  title?: string
  position?: 'right' | 'left' | 'center'
  open: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({
  title,
  position = 'center',
  open,
  onClose,
  children,
}) => {
  const positionConfig = {
    right: {
      modalPosition: 'justify-end',
      modalWidth: 'w-3/4',
      modalHeight: 'h-full',
      translateXStart: 'translate-x-0',
      translateXEnd: 'translate-x-full',
      modalBorderRadius: 'rounded-none',
    },
    left: {
      modalPosition: 'justify-start',
      modalWidth: 'w-3/4',
      modalHeight: 'h-full',
      translateXStart: '-translate-x-0',
      translateXEnd: '-translate-x-full',
      modalBorderRadius: 'rounded-none',
    },
    center: {
      modalPosition: 'items-center justify-center',
      modalWidth: 'w-3/4',
      modalHeight: 'h-3/4',
      translateXStart: 'transform-none',
      translateXEnd: 'transform-none',
      modalBorderRadius: 'rounded-xl',
    },
  }

  const {
    modalPosition,
    modalWidth,
    modalHeight,
    translateXStart,
    translateXEnd,
    modalBorderRadius,
  } = positionConfig[position] || positionConfig.center

  const handleBackdropClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handleCloseClick = () => {
    onClose()
  }

  return (
    <aside
      tabIndex={-1}
      onClick={handleBackdropClick}
      aria-hidden={!open}
      aria-labelledby={title && title}
      className={`fixed inset-0 z-50 flex ${modalPosition} transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalHeight} ${modalWidth} ${modalBorderRadius} overflow-y-auto bg-white transition-all ease-in-out ${
          open ? `${translateXStart} opacity-100` : `${translateXEnd} opacity-0`
        }`}
      >
        <div
          className={`flex ${title ? 'justify-between' : 'justify-end'} px-4 pt-4`}
        >
          {title && (
            <a href="/" className="flex items-center tablet:w-52">
              <p className="text-2xl font-normal tablet:pb-0 tablet:text-3xl tablet:font-semibold">
                {title}
              </p>
            </a>
          )}

          <X
            onClick={handleCloseClick}
            size={34}
            className="rounded-md text-gray-400 hover:bg-gray-100 hover:text-primary-500"
          />
        </div>
        {children}
      </div>
    </aside>
  )
}

export default Modal
