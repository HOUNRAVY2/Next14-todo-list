import { NextResponse } from 'next/server';
import { deleteTodo, updateTodo } from '@/service/todoService';
import { Todo } from '@/type/todo.type';
import { TodoSchema } from '@/schema/todo';
export const dynamic = 'force-dynamic'; 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: true } | { error: string }>> {
  try {
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const todo = await deleteTodo(params.id);

if(todo?.success === false) {
    return NextResponse.json(
        { error: todo.error },
        { status: 404 }
    );
}

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete todo error:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Todo | unknown  | { success: true | unknown } | { error: string }>> {
  try {
    const rawBody = await req.json();
    const validated = TodoSchema.parse(rawBody);
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }
    const updatedTodo = await updateTodo(params.id, validated);
    console.log("new data all:", updatedTodo);


 return NextResponse.json({
      respone: 'success',
      data: updatedTodo
    }, {

      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Todo not found!!',
      },
      { status: 500 }
    );
  }
}