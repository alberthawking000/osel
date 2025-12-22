# Interactive OS Kernel Visualizer

An educational web application for visualizing operating system kernel internals including process scheduling, memory management, system calls, and descriptor tables.

## Features

- **Process Scheduler Visualizer**: Visualize CPU scheduling algorithms with Round Robin
- **Memory Manager Visualizer**: Explore virtual memory, paging, and TLB operations
- **System Call Tracer**: Watch system calls transition from user space to kernel space
- **GDT/IDT Inspector**: Inspect Global Descriptor Table and Interrupt Descriptor Table entries

## Project Structure

- `frontend/` - React application with all visualizations
- `backend/` - Backend services (currently not used as all simulations run client-side)

## Getting Started

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- React with React Router
- Zustand for state management
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons