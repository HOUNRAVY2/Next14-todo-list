import { NextResponse } from 'next/server';
import { getAllTodos, createTodo } from '@/service/todoService';
import { Todo } from '@/type/todo.type';
import { TodoSchema } from '@/schema/todo';
export const dynamic = 'force-dynamic';



export async function GET(): Promise<NextResponse<Todo[] | { error: string, details?: string}>> {
  try {
    const todos = await getAllTodos();
    if (!todos || todos.length === 0) {
      return NextResponse.json(
        { error: 'No todos found' },
        { status: 404 }
      );
    }
    return NextResponse.json(todos, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error: unknown) {
    console.error('Firestore error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}



export async function POST(req: Request): Promise<NextResponse<any | { error: string; details?: string }>> {
  try {
    const rawBody = await req.json();
    const validatedData = TodoSchema.parse(rawBody);
    const createdTodo = await createTodo(validatedData);
 
    return NextResponse.json({
      response: 'success',
      data: createdTodo
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('Todo creation error:', error);
    }

    return NextResponse.json(
      { 
        response: 'Failed to create todo',
       
      },
      { status: 500 }
    );
  }
