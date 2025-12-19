/**
 * freeCodeCamp Scientific Computing Project 04: Polygon Area Calculator
 * Object-oriented geometric modeling for rectangles and squares with ASCII rendering and tiling calculation.
 */

export class Rectangle {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public set_width(width: number): void {
    this.width = width;
  }

  public set_height(height: number): void {
    this.height = height;
  }

  public get_area(): number {
    return this.width * this.height;
  }

  public get_perimeter(): number {
    return 2 * this.width + 2 * this.height;
  }

  public get_diagonal(): number {
    return (this.width ** 2 + this.height ** 2) ** 0.5;
  }

  public get_picture(): string {
    if (this.width > 50 || this.height > 50) {
      return 'Too big for picture.';
    }
    const row = '*'.repeat(this.width) + '\n';
    return row.repeat(this.height);
  }

  public get_amount_inside(shape: Rectangle): number {
    const horizontalFit = Math.floor(this.width / shape.width);
    const verticalFit = Math.floor(this.height / shape.height);
    return horizontalFit * verticalFit;
  }

  public toString(): string {
    return `Rectangle(width=${this.width}, height=${this.height})`;
  }
}

export class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  public set_side(side: number): void {
    this.width = side;
    this.height = side;
  }

  public override set_width(width: number): void {
    this.set_side(width);
  }

  public override set_height(height: number): void {
    this.set_side(height);
  }

  public override toString(): string {
    return `Square(side=${this.width})`;
  }
}
