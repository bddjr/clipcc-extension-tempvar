import { type } from "clipcc-extension"
import defineBlock from "../../utils/define-block"

const categoryID: string = 'tempvar'
const color: string = '' // Use global color

const tempvar = new Map()

const blocks: MyBlock<BlockParams>[] = [
    defineBlock({
        id: 'get',
        type: type.BlockType.REPORTER,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): any {
            return (
                tempvar.has(args.name)
                    ? tempvar.get(args.name)
                    : ''
            )
        }
    }),
    defineBlock({
        id: 'set',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            value: {
                type: type.ParameterType.STRING,
                defaultValue: '0'
            },
        },
        function(args, util): void {
            tempvar.set(args.name, args.value)
        }
    }),
    defineBlock({
        id: 'plus',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            number: {
                type: type.ParameterType.NUMBER,
                defaultValue: '1'
            },
        },
        function(args, util): void {
            let left = +tempvar.get(args.name)
            if (Number.isNaN(left))
                left = 0

            let right = +args.number
            if (Number.isNaN(right))
                right = 0

            tempvar.set(args.name, left + right)
        }
    }),
    defineBlock({
        id: 'join',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            value: {
                type: type.ParameterType.STRING,
                defaultValue: 'banana'
            },
        },
        function(args, util): void {
            const left = (
                tempvar.has(args.name)
                    ? String(tempvar.get(args.name))
                    : ''
            )
            tempvar.set(args.name, left + args.value)
        }
    }),
    defineBlock({
        id: 'has',
        type: type.BlockType.BOOLEAN,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): boolean {
            return tempvar.has(args.name)
        }
    }),
    defineBlock({
        id: 'delete',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): boolean {
            return tempvar.delete(args.name)
        }
    }),
    defineBlock({
        id: 'clear',
        type: type.BlockType.COMMAND,
        function(args, util): void {
            tempvar.clear()
        }
    }),
]



export const category_tempvar: MyCategory = {
    id: categoryID,
    color,
    blocks,
}
