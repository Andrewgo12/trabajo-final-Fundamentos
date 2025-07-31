import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const Progress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default', // 'default', 'success', 'warning', 'error'
  showValue = false,
  showPercentage = true,
  animated = true,
  striped = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };

  const variantClasses = {
    default: 'bg-primary-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const backgroundClasses = {
    default: 'bg-primary-100',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100'
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {/* Progress bar */}
      <div className={`
        relative overflow-hidden rounded-full
        ${sizeClasses[size]} 
        ${backgroundClasses[variant]}
      `}>
        <motion.div
          className={`
            h-full rounded-full transition-all duration-300
            ${variantClasses[variant]}
            ${striped ? 'bg-stripes' : ''}
            ${animated && striped ? 'animate-stripes' : ''}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
        />
      </div>

      {/* Value display */}
      {(showValue || showPercentage) && (
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          {showValue && (
            <span>{value} / {max}</span>
          )}
          {showPercentage && (
            <span>{Math.round(percentage)}%</span>
          )}
        </div>
      )}
    </div>
  );
};

// Circular progress component
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = true,
  strokeWidth = 4,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const variantClasses = {
    default: 'stroke-primary-600',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500'
  };

  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`} {...props}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={variantClasses[variant]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            strokeDasharray,
          }}
        />
      </svg>
      
      {/* Center text */}
      {showValue && (
        <div className={`
          absolute inset-0 flex items-center justify-center
          font-semibold ${textSizeClasses[size]}
        `}>
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

// Step progress component
export const StepProgress = ({
  steps = [],
  currentStep = 0,
  variant = 'default',
  orientation = 'horizontal', // 'horizontal' or 'vertical'
  showLabels = true,
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: {
      active: 'bg-primary-600 border-primary-600 text-white',
      completed: 'bg-green-500 border-green-500 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      line: 'bg-primary-600',
      lineInactive: 'bg-gray-300'
    },
    success: {
      active: 'bg-green-600 border-green-600 text-white',
      completed: 'bg-green-500 border-green-500 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      line: 'bg-green-600',
      lineInactive: 'bg-gray-300'
    }
  };

  const classes = variantClasses[variant];

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (step, status, index) => {
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5" />;
    }
    if (step.icon) {
      const IconComponent = step.icon;
      return <IconComponent className="w-5 h-5" />;
    }
    return <span className="text-sm font-medium">{index + 1}</span>;
  };

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`} {...props}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex items-start">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  ${classes[status]}
                `}>
                  {getStepIcon(step, status, index)}
                </div>
                
                {/* Connecting line */}
                {!isLast && (
                  <div className={`
                    w-0.5 h-8 mt-2
                    ${index < currentStep ? classes.line : classes.lineInactive}
                  `} />
                )}
              </div>

              {/* Step content */}
              {showLabels && (
                <div className="ml-4 pb-8">
                  <div className={`font-medium ${
                    status === 'active' ? 'text-gray-900' : 
                    status === 'completed' ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`} {...props}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center
                ${classes[status]}
              `}>
                {getStepIcon(step, status, index)}
              </div>
              
              {/* Step label */}
              {showLabels && (
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    status === 'active' ? 'text-gray-900' : 
                    status === 'completed' ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
              )}
            </div>

            {/* Connecting line */}
            {!isLast && (
              <div className={`
                flex-1 h-0.5 mx-4
                ${index < currentStep ? classes.line : classes.lineInactive}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Upload progress component
export const UploadProgress = ({
  files = [],
  className = '',
  ...props
}) => (
  <div className={`space-y-3 ${className}`} {...props}>
    {files.map((file, index) => (
      <div key={index} className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {file.status === 'completed' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : file.status === 'error' ? (
            <Circle className="w-5 h-5 text-red-500" />
          ) : (
            <Clock className="w-5 h-5 text-blue-500" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </span>
            <span className="text-sm text-gray-500">
              {file.progress}%
            </span>
          </div>
          
          <Progress
            value={file.progress}
            variant={
              file.status === 'completed' ? 'success' :
              file.status === 'error' ? 'error' : 'default'
            }
            size="sm"
            animated={file.status === 'uploading'}
          />
        </div>
      </div>
    ))}
  </div>
);

export default Progress;
